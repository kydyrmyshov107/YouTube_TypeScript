import scss from "./Header.module.scss";
import logo from "../../../assets/trash.png";
import logo_Two from "../../../assets/icon_9.png";
import message from "../../../assets/Message.png";

const Header = () => {
  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div>
            <img
              src="https://static.vecteezy.com/system/resources/previews/018/930/572/non_2x/youtube-logo-youtube-icon-transparent-free-png.png"
              alt=""
            />
          </div>
          <div className={scss.conDiv}>
            <input
              type="text"
              name="text"
              className={scss.input}
              placeholder="Dark Twitch Search"
            />
            <button className={scss.search__btn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
              >
                <path
                  d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                  fill="#efeff1"
                ></path>
              </svg>
            </button>
          </div>
          <div className={scss.logoTwo}>
            <img src={logo_Two} alt="" />
          </div>

          <div className={scss.logo}>
            <img src={logo} alt="image" />
          </div>
          <div className={scss.message}>
            <img src={message} alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
