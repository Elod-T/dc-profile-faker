import React from "react";
import AboutMe from "./aboutMe";
import IProfileProps from "../types/IProfileProps";

interface IProfileFullState {
  active: string;
}

export default class ProfileFull extends React.Component<
  IProfileProps,
  IProfileFullState
> {
  constructor(props: IProfileProps) {
    super(props);
    this.state = {
      active: "user-info",
    };
  }

  render() {
    return (
      <div className="card w-[600px] h-[530px] bg-discord-darker shadow-xl relative">
        <div
          id="avatar"
          style={{ backgroundColor: this.props.accent }}
          className="w-full h-28"
        ></div>
        <div className="z-10 absolute top-12 left-4 w-30">
          <img
            className="rounded-full outline outline-[6px] outline-discord-darker w-32 h-32"
            src={this.props.avatar_url}
          />
          <svg
            className="absolute bottom-0 right-0 w-10 h-10 fill-discord-darker"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg
            className="absolute bottom-2 right-2 w-6 h-6 fill-green-600"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>

        <div className="z-10 absolute top-44 left-1 h-[184px] w-full">
          <div className="absolute top-2 left-3 flex flex-row">
            <div className="font-bold text-white text-xl">
              {this.props.username}
            </div>
            <div className="font-extrabold text-lg text-discord-font">
              #{this.props.discriminator}
            </div>
          </div>

          <div className="absolute top-10 left-3 truncate w-[575px]">
            {this.props.status}
          </div>

          <div className="absolute top-[75px] flex flex-row">
            <a
              className={
                (this.state.active == "user-info"
                  ? "text-white"
                  : "border-transparent") +
                " border-b-2 hover:border-white hover:text-white px-4 pb-4 text-sm rounded-sm"
              }
              onClick={() => this.setState({ active: "user-info" })}
            >
              User Info
            </a>
            <a
              className={
                (this.state.active == "mutual-servers"
                  ? "text-white"
                  : "border-transparent") +
                " border-b-2 hover:border-white hover:text-white px-4 pb-4 text-sm rounded-sm"
              }
              onClick={() => this.setState({ active: "mutual-servers" })}
            >
              Mutual Servers
            </a>
            <a
              className={
                (this.state.active == "mutual-friends"
                  ? "text-white"
                  : "border-transparent") +
                " border-b-2 hover:border-white hover:text-white px-4 pb-4 text-sm rounded-sm"
              }
              onClick={() => this.setState({ active: "mutual-friends" })}
            >
              Mutual Friends
            </a>
          </div>
          <div className="absolute top-16 left-3 w-full">
            {this.state.active == "user-info" ? (
              <AboutMe {...this.props} />
            ) : null}
          </div>
        </div>

        <hr className="absolute top-72 left-0 w-full border border-discord-dark" />
      </div>
    );
  }
}
