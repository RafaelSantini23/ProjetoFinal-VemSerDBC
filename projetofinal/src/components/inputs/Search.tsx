import { Icon, SearchDiv, SearchStyle } from "./Search.styles";

function Search() {
  return (
      <SearchDiv>
        <SearchStyle type="text" maxLength={55} />
        <Icon />
      </SearchDiv>
  )
}
export default Search