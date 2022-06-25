import { AiOutlineSearch } from "react-icons/ai";
import classNames from "classnames/bind";
import styles from "./SearchByText.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);
function SearchByText({onFillByText}) {
  const [textSearch, setTextSearch] = useState("");

  return (
    <div className={cx("search-by-text")}>
      <div className={cx("search-desc")}>Search</div>
      <div className={cx("search-wrapper")}>
        <input
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
          type="text"
          placeholder="Input search text"
          className={cx("search-input")}
        />
        <button className={cx("search-btn")} onClick ={() =>{
          onFillByText("All",textSearch.trim())
          setTextSearch("")
        }} >
          <AiOutlineSearch></AiOutlineSearch>
        </button>
      </div>
    </div>
  );
}

export default SearchByText;
