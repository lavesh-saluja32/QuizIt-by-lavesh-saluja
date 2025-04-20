import React, { useEffect, useState } from "react";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  useFetchCategories,
  useReorderCategory,
} from "hooks/reactQuery/useCategories";

import Card from "./Card";
import Header from "./Header";
import { reorderLocally } from "./utils";

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState("");

  const { data: { data: categories = [] } = {} } = useFetchCategories();

  const { mutate: reorderCategory } = useReorderCategory();

  const onDragEnd = result => {
    if (!result.destination) return;
    const categoryId = result.draggableId;
    const destination = result.destination.index;
    const source = result.source.index;
    setCategoriesData(reorderLocally(categories, source, destination));

    reorderCategory({ categoryId, payload: { position: destination + 1 } });
  };

  useEffect(() => {
    setCategoriesData(categories);
  }, [categories]);

  return (
    <div className="h-full w-full overflow-y-scroll bg-slate-100">
      <Header
        {...{
          categoriesCount: categories.length,
          editCategoryId,
          setEditCategoryId,
        }}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="categoryList">
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="mt-7 space-y-2 p-2"
            >
              {categoriesData.map((category, index) => (
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
                      <Card
                        {...{ ...category, id: category.id, setEditCategoryId }}
                      />
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
