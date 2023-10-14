import PreviewLink from "./PreviewLink";
import { IFirebaseLink } from "../../ts/models/firebase-link.model";

const PreviewLinkList = ({ links }: { links: IFirebaseLink[] } ) => links.map(link => <PreviewLink key={link.id} link={link} />);

export default PreviewLinkList;