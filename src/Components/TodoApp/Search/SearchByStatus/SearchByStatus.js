import classNames from "classnames/bind";
import styles from "./SearchByStatus.module.scss";

const cx = classNames.bind(styles);
function SearchByStatus({ onFillByStatus }) {

  const handleSearch = (e) => {
    onFillByStatus(e.target.value.trim());
  }
  return (
    <div className={cx("search-by-satatus")}>
      <div className={cx("search-desc")}>Search by status</div>
      <div className={cx("search-wrapper")}>
        <div className={cx("status-item")}>
          <input
            value="All"
            name="status"
            type="radio"
            defaultChecked={true}
            className={cx("search-input")}
            onClick = {handleSearch}
          />
          <span>All</span>
        </div>
        <div className={cx("status-item")}>
          <input
            value="Complete"
            name="status"
            type="radio"
            className={cx("search-input")}
            onClick = {handleSearch}
          />
          <span>Complete</span>
        </div>
        <div className={cx("status-item")}>
          <input
            value="Pendding"
            name="status"
            type="radio"
            className={cx("search-input")}
            onClick = {handleSearch}
          />
          <span>Pendding</span>
        </div>
      </div>
    </div>
  );
}

export default SearchByStatus;
