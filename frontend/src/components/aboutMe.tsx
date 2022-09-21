interface IAboutMeProps {
  about_me: string;
  bio: string;
  note: string;
  click_to_add_a_note: string;
}

export default function AboutMe(props: IAboutMeProps) {
  return (
    <div className="relative">
      <div className="mt-16 uppercase text-xs text-white font-extrabold">
        {props.about_me}
      </div>

      <div className="mt-1 text-xs">{props.bio}</div>

      <div className="mt-2 uppercase text-xs text-white font-extrabold">
        {props.note}
      </div>

      <div className="mt-1 text-xs">{props.click_to_add_a_note}</div>
    </div>
  );
}
