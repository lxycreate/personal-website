export default function CPicture(props: {
    src: string;
    width: string;
    height: string;
}) {
    return <img className="c-picture" src={props.src} width={props.width} height={props.height} />;
}
