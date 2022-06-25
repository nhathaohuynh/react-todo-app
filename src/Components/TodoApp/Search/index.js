import classNames from "classnames/bind";
import styles from "./search.module.scss";
import SearchByText from "./SearchByText/SearchByText";
import SearchByStatus from "./SearchByStatus/SearchByStatus";

const cx = classNames.bind(styles);
function Search({onSearchTodos}) {
  return (
    <div className={cx("wrapper")}>
      <SearchByText onFillByText = {onSearchTodos} ></SearchByText>
      <SearchByStatus onFillByStatus = {onSearchTodos}></SearchByStatus>
    </div>
  );
}

export default Search;
