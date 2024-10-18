import { Request, Response } from 'express';
import Skill from '../models/skillModel';

// @desc    Criar nova skill
// @route   POST /api/skills/create
export const createSkill = async (req: Request, res: Response) => {
  try {
    const newSkill = new Skill(req.body);

    const savedSkill = await newSkill.save();

    res.status(201).json(savedSkill);
  } catch (error) {
    console.error('Erro ao salvar a habilidade:', error);

    res
      .status(400)
      .json({ message: 'Erro ao criar a habilidade', error: error as Error });
  }
};

// @desc    Trazer skills
// @route   GET /api/skills
export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find();

    res.status(200).json(skills);
  } catch (error) {
    console.error('Erro ao buscar habilidades:', error);

    res
      .status(500)
      .json({ message: 'Erro ao buscar tags', error: error as Error });
  }
};
