import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import usersContext from "../../../store/usersContext";
import { useContext } from "react";
import filterContext from "../../../store/filterContext";
const FilterComponent = () => {
  const { setDataFromServer, CopyCard } = useContext(filterContext);
  const { setuserInfo, userCopy } = useContext(usersContext);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const cardsSearch = CopyCard.filter((card) => {
      return card.title.includes(inputValue);
    });
    const userSearch = userCopy.filter((user) => {
      return user.name.first.includes(inputValue);
    });
    if (!inputValue || inputValue.length < 1) {
      setDataFromServer(CopyCard);
      setuserInfo(userCopy);
      return;
    }
    setuserInfo(userSearch);
    setDataFromServer(cardsSearch);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={handleInputChange}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default FilterComponent;
