import React from "react";
import ProfileInList from "./profileInList";
import IProfileProps from "../types/IProfileProps";

interface IProfileListColumnProps extends IProfileProps {
  count: number;
}

export default class ProfileListColumn extends React.Component<IProfileListColumnProps> {
  constructor(props: IProfileListColumnProps) {
    super(props);
  }

  render() {
    return (
      <div className="brightness-[0.7]">
        {[...Array(this.props.count)].map((e, i) => (
          <div key={i}>
            <ProfileInList {...this.props} />
          </div>
        ))}
      </div>
    );
  }
}
