import React from "react";
import NoteIcon from "./noteIcon";
import IProfileProps from "../types/IProfileProps";

export default class ProfileInList extends React.PureComponent<IProfileProps> {
  constructor(props: IProfileProps) {
    super(props);
  }

  render() {
    return (
      <div className="relative w-56 h-10 bg-discord-dark">
        <div className="absolute w-10">
          <img
            className="rounded-full w-8 h-8 mt-[3px] ml-[3px]"
            src={this.props.avatar_url}
          />
          <svg
            className="absolute bottom-0 right-[1px] w-3 h-3 fill-zinc-800"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg
            className="absolute bottom-[2px] right-[3px] w-[8px] h-[8px] fill-green-600"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>

        <div className={(this.props.status == "" ? "pt-2" : "pt-0") + " pl-12"}>
          <div className="text-white">{this.props.username}</div>
        </div>
        <div className="absolute left-12 bottom-[1px] overflow-hidden w-[169px]">
          {this.props.status != "" ? (
            <div className="flex flex-row text-xs font-normal w-full">
              <div className="truncate">{this.props.status}</div>
              <NoteIcon />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
