import { Wrapper, Input } from './Filter.styles';
const Filter = ({ value, onChange }) => {
  return (
    <Wrapper>
      <label>
        <p>Find contacts for name</p>
        <Input type="text" value={value} onChange={onChange} />
      </label>
    </Wrapper>
  );
};
export default Filter;
