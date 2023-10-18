import PreviewLink from "./PreviewLink";
import { IFirebaseLink } from "../../ts/models/firebase-link.model";

const PreviewLinkList = ({ links, previewMode = false }: { links: IFirebaseLink[], previewMode?: boolean } ) => 
links.map(link => <PreviewLink key={link.id} link={link} previewMode={previewMode} />);

export default PreviewLinkList;