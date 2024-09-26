import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faGripVertical, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import './TableUI.css';
import image1 from "../images/01_10_discount_saree.jpg";
import image2 from "../images/02_20_discount_one piece.jpg";
import image3 from "../images/03_10_discount_lehenga.jpg";
import image4 from "../images/04_no_discount_chudidhar.jpg";
import image5 from "../images/05_25_discount_chudidhar.jpg";
import image6 from "../images/06_10_discount_chudidhar.jpg";
import image7 from "../images/07_18_discount_lehenga.jpg";
import image8 from "../images/08_15_discount_lehenga.jpg";
import image9 from "../images/09_no_discount_saree.jpg";
import image10 from "../images/10_05_discount_saree.jpg";
import image11 from "../images/11_10_discount_one piece.jpg";
import image12 from "../images/12_no_discount_one piece.jpg";
import image13 from "../images/13_no_discount_kurthi.jpg";
import image14 from "../images/14_15_discount_kurthi.jpg";
import image15 from "../images/15_10_discount_kurthi.jpg";
import image16 from "../images/16_no_discount_nightwear.jpg";

const sampleImages = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16
];

const initialData = [
  {
    id: "1",
    productFilter: "Saree",
    variants: [image1, image9],
  },
  {
    id: "2",
    productFilter: "Lehenga",
    variants: [image8, image7],
  },
  {
    id: "3",
    productFilter: "One piece",
    variants: [image2, image11],
  },
  {
    id: "4",
    productFilter: "Chudidhar",
    variants: [image4, image5],
  }
];

const TableUI = () => {
  const [tableData, setTableData] = useState(initialData);
  const [variantCount, setVariantCount] = useState(2);
  const [showImageGrid, setShowImageGrid] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [showDeleteColumnMenu, setShowDeleteColumnMenu] = useState(false);
  const [columnToDelete, setColumnToDelete] = useState(null);
  const [filterText, setFilterText] = useState({});

  const addState = () => {
    const newState = {
      id: `state-${tableData.length + 1}`,
      productFilter: "Add Filter",
      variants: Array(variantCount).fill(null),
    };
    setTableData([...tableData, newState]);
  };

  const removeState = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };

  const addVariantToAllRows = () => {
    const updatedTableData = tableData.map((state) => ({
      ...state,
      variants: [...state.variants, null],
    }));
    setTableData(updatedTableData);
    setVariantCount(variantCount + 1);
  };

  const handleFilterChange = (index, newFilter) => {
    const updatedData = [...tableData];
    updatedData[index].productFilter = newFilter;
    setTableData(updatedData);
  };

  const handleAddFilterClick = (index) => {
    const newText = prompt("Enter new product filter:", tableData[index].productFilter);
    if (newText !== null) {
      setFilterText((prev) => ({ ...prev, [index]: newText }));
    }
  };

  const handleAddDesign = (rowIndex, columnIndex) => {
    setSelectedCell({ rowIndex, columnIndex });
    setShowImageGrid(true);
  };

  const handleImageInsert = (image) => {
    const updatedData = [...tableData];
    updatedData[selectedCell.rowIndex].variants[selectedCell.columnIndex] = image;
    setTableData(updatedData);
    setShowImageGrid(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tableData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTableData(items);
  };

  const deleteColumn = () => {
    const updatedTableData = tableData.map(state => {
      const updatedVariants = state.variants.filter((_, index) => index !== columnToDelete);
      return { ...state, variants: updatedVariants };
    });
    setTableData(updatedTableData);
    setVariantCount(variantCount - 1);
    setShowDeleteColumnMenu(false);
    setColumnToDelete(null);
  };

  const openDeleteColumnMenu = (columnIndex) => {
    setColumnToDelete(columnIndex);
    setShowDeleteColumnMenu(true);
  };

  return (
    <div className="container mx-auto p-5">
      <div className="table-wrapper">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="table-content"
              >
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="fixed-width">Serial No</th>
                      <th className="fixed-width">Product Filter</th>
                      {Array.from({ length: variantCount }, (_, i) => (
                        <th key={i} className="variant-columns-header">
                          Variant {i + 1}
                          <IconButton onClick={() => openDeleteColumnMenu(i)} className="delete-column-icon">
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                          </IconButton>
                        </th>
                      ))}
                      <th className="fixed-width">Add Column</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((state, index) => (
                      <Draggable key={state.id} draggableId={state.id} index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="row-shadow"
                          >
                            <td className="fixed-width">
                              <div className="drag-handle" {...provided.dragHandleProps}>
                                <FontAwesomeIcon icon={faGripVertical} />
                              </div>
                              {index + 1}
                              <Tooltip title="Delete Row" arrow>
                                <IconButton
                                  color="secondary"
                                  onClick={() => removeState(index)}
                                  className="delete-row"
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'red' }} className="text-red-500" />
                                </IconButton>
                              </Tooltip>
                            </td>
                            <td className="fixed-width">
                              <div className="filter-box" onClick={() => handleAddFilterClick(index)}>
                                {filterText[index] || state.productFilter}
                              </div>
                            </td>
                            {state.variants.map((variant, i) => (
                              <td key={i} className="variant-cell">
                                {variant ? (
                                  <>
                                    <img
                                      src={variant}
                                      alt={`Design ${i + 1}`}
                                      className="variant-img"
                                    />
                                    <Tooltip title="Edit Design" arrow>
                                      <IconButton onClick={() => handleAddDesign(index, i)} className="edit-icon">
                                        <FontAwesomeIcon icon={faEdit} />
                                      </IconButton>
                                    </Tooltip>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => handleAddDesign(index, i)}
                                    className="add-design-btn"
                                  >
                                    Add Design
                                  </button>
                                )}
                              </td>
                            ))}
                            <td className="add-column-cell">
                              <IconButton onClick={addVariantToAllRows} className="add-column-icon">
                                <AddIcon />
                              </IconButton>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                  </tbody>
                </table>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <IconButton onClick={addState} className="add-row-btn">
          <AddIcon />
        </IconButton>

        {showImageGrid && (
          <div className="overlay">
            <div className="image-grid">
              {sampleImages.map((img, i) => (
                <div key={i} className="image-item">
                  <img src={img} alt={`Image ${i + 1}`} />
                  <button onClick={() => handleImageInsert(img)} className="insert-image-btn">
                    Insert
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {showDeleteColumnMenu && (
          <div className="overlay">
            <div className="delete-column-popup">
              <p>Are you sure you want to delete this column?</p>
              <button onClick={deleteColumn}>Yes</button>
              <button onClick={() => setShowDeleteColumnMenu(false)}>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableUI;
