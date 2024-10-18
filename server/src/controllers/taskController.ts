import { Request, Response } from 'express';
import Task from '../models/taskModel';
import Skill from '../models/skillModel';
import puppeteer from 'puppeteer';
import path from 'path';

// @desc    Criar nova task
// @route   POST /api/tasks/create
export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      goals,
      collectionSkills,
      totalTime,
      resources,
      stepByStep,
    } = req.body;

    const skillIds = await Skill.find({
      name: { $in: collectionSkills },
    }).select('_id');

    console.log(skillIds);

    const newTask = new Task({
      title,
      description,
      goals,
      collectionSkills: skillIds,
      totalTime,
      resources,
      stepByStep,
    });

    const savedTask = await newTask.save();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            p { font-size: 16px; }
            .field { margin-bottom: 10px; }
            .field label { font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Detalhes da Tarefa Criada</h1>
          <div class="field">
            <label>Título:</label>
            <p>${savedTask.title}</p>
          </div>
          <div class="field">
            <label>Descrição:</label>
            <p>${savedTask.description || 'Sem descrição'}</p>
          </div>
          <div class="field">
            <label>Objetivos:</label>
            <p>${savedTask.goals}</p>
          </div>
          <div class="field">
            <label>Tempo Total:</label>
            <p>${savedTask.totalTime}</p>
          </div>
          <div class="field">
            <label>Habilidades:</label>
            <p>${collectionSkills.join(', ')}</p>
          </div>
          <div class="field">
            <label>Recursos:</label>
            <p>${savedTask.resources}</p>
          </div>
          <div class="field">
            <label>Passo a Passo:</label>
            <p>${savedTask.stepByStep}</p>
          </div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    const pdfDirectory = path.resolve(process.cwd(), 'files');

    const pdfPath = path.join(pdfDirectory, `Resultado-${Date.now()}.pdf`);
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
    });

    await browser.close();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Erro ao salvar a atividade:', error);

    res
      .status(400)
      .json({ message: 'Erro ao criar a atividade', error: error as Error });
  }
};

// @desc    Trazer tasks
// @route   GET /api/tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({}).populate('collectionSkills', 'name');
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erro ao buscar atividades:', error);

    res
      .status(500)
      .json({ message: 'Erro ao buscar atividades', error: error as Error });
  }
};

// @desc    Editar tasks por id
// @route   PUT /api/tasks/:id
export const EditTaskById = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      goals,
      collectionSkills,
      totalTime,
      resources,
      stepByStep,
    } = req.body;

    const skillIds = await Skill.find({
      name: { $in: collectionSkills },
    }).select('_id');

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        goals,
        collectionSkills: skillIds,
        totalTime,
        resources,
        stepByStep,
      },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    console.error('Erro ao editar atividades:', error);

    res
      .status(500)
      .json({ message: 'Erro ao editar atividade', error: error as Error });
  }
};

// @desc    Deletar tasks por id
// @route   DELETE /api/tasks/:id
export const deleteTaskById = async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    res.json(deletedTask);
  } catch (error) {
    console.error('Erro ao deletar atividades:', error);

    res
      .status(500)
      .json({ message: 'Erro ao deletar atividade', error: error as Error });
  }
};
