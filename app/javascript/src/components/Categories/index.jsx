import React from "react";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useFetchCategories } from "hooks/reactQuery/useCategories";

import Card from "./Card";
import Header from "./Header";

const Categories = () => {
  const { data: { data: categories = [] } = {} } = useFetchCategories();

  const onDragEnd = result => {
    logger.info(result);
    // You can implement reordering and API updates here
  };

  return (
    <div className="h-full w-full overflow-y-scroll bg-slate-100">
      <Header {...{ categoriesCount: categories.length }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="categoryList">
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="mt-7 space-y-2 p-2"
            >
              {categories.map((category, index) => (
                <Draggable
                  draggableId={category.id}
                  index={index}
                  key={category.id}
                >
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card {...category} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Categories;
