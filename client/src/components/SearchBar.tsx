import { Input } from 'antd';

const SearchBar = ({ setSearchValue }: { setSearchValue: any }) => {
  return (
    <div className="pt-5 w-2/3 md:w-1/3 lg:w-1/5 m-auto">
      <Input onChange={(e) => setSearchValue(e.target.value)} addonAfter="🔎" />
    </div>
  );
};
export default SearchBar;
