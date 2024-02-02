import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Cards from "./Cards";

const List = ({ title, data, droppableId }) => {
  console.log(data,"data")
  return (
    <div className="list-container">
      <h2>{title}</h2>
      <Droppable droppableId={droppableId} index={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="card-list"
          >
            {Array.isArray(data) && data.map((item, index) => (
              <Cards key={item.id} alldata={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;
