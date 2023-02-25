export default function CLink(props: { link: string; text: string }) {
    return (
        <a className="c-link" href={props.link} target="_blank">
            {props.text}
        </a>
    );
}
