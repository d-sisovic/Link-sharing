import LinkItem from "./LinkItem";
import styles from "./LinkList.module.scss";
import { UTIL } from "../../ts/enums/util.enum";
import { ILinkList } from "./ts/models/link-list.model";
import { DragDropContext, Droppable, Draggable, DraggableStyle } from "@hello-pangea/dnd";

const LinkList = ({ links, formValidity, baseIndex, onDragEnd, removeLinkHandler, formValidityHandler }: ILinkList) => {
    const getItemStyle = (isDragging: boolean, draggableStyle: DraggableStyle | undefined) => ({
        ...draggableStyle,
        opacity: isDragging ? 0.8 : 1
    });

    return <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
            {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef} className={styles.container}>
                    {links.map((link, index) => (<Draggable key={link.id} draggableId={link.id}
                        index={index} isDragDisabled={link.id.startsWith(UTIL.NEW_LINK_ID)}>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                <LinkItem key={link.id} dragProps={provided.dragHandleProps} formValidity={formValidity} link={link} index={baseIndex + index}
                                    removeLinkHandler={removeLinkHandler} formValidityHandler={formValidityHandler} />
                            </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </DragDropContext>;
};

export default LinkList;