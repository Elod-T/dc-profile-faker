import React from "react";
import AboutMe from "./aboutMe";
import Pencil from "./pencil";
import Brilliance from "./brilliance";
import IProfileProps from "../types/IProfileProps";

export default class ProfileCard extends React.Component<IProfileProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="card w-[340px] h-min bg-discord-dark shadow-xl flex relative">
        <svg
          className="absolute top-3 right-3 w-6 h-6 fill-discord-dark"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <div className="absolute top-[14.5px] right-[15px]">
          <Pencil />
        </div>

        <div
          id="avatar"
          style={{ backgroundColor: this.props.accent }}
          className="w-full h-14"
        ></div>
        <div className="z-10 absolute top-4 left-4 w-20">
          <img
            className="rounded-full outline outline-[6px] outline-discord-dark w-[72px] h-[72px]"
            src={this.props.avatar_url}
          />
          <svg
            className="absolute bottom-0 right-0 w-6 h-6 fill-discord-dark"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg
            className="absolute bottom-1 right-1 w-4 h-4 fill-green-600"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>

        <div className="absolute top-16 right-4 bg-discord-darker w-7 h-7 z-10 rounded-lg"></div>
        <div className="absolute top-[66px] right-[18px] z-10">
          <Brilliance />
        </div>
        <div className="z-10 absolute bottom-4 mx-4 h-[184px] card bg-discord-darker w-[90.7%] rounded-xl">
          <div
            className={
              (this.props.status == "" ? "top-4" : "top-2") +
              " absolute left-3 flex flex-row"
            }
          >
            <div className="font-extrabold text-white text-lg">
              {this.props.username}
            </div>
            <div className="font-extrabold text-lg text-discord-font-light">
              #{this.props.discriminator}
            </div>
          </div>

          <div className="absolute top-10 left-3 text-sm truncate w-72">
            {this.props.status}
          </div>

          <hr
            className={
              (this.props.status != "" ? "top-[66px]" : "top-14") +
              " absolute left-3 w-11/12 border border-discord-dark"
            }
          />

          <div
            className={
              (this.props.status != "" ? "top-4" : "top-1") +
              " absolute left-3 w-full h-full"
            }
          >
            <AboutMe {...this.props} />
          </div>
        </div>

        <div className="bg-discord-dark w-80 h-64 z-0"></div>
      </div>
    );
  }
}
