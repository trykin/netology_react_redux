import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "./Redux/Hooks";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";
import {
  IComponent,
  addComponent,
  deleteComponent,
  editComponent,
} from "./Redux/Slice";

interface IEdit {
  isEdit: boolean;
  item: IComponent;
}

export function Components() {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState<IEdit>({
    isEdit: false,
    item: { name: "", price: "" },
  });
  const components = useAppSelector((store) => store.component);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const buttonDisable = name === "" && price === "" ? true : false;
  const buttonName = edit.isEdit ? "Изменить" : "Добавить";

  const currentArray = search === "" ? components : components.filter((e) => e.name.includes(search));

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>Поиск</InputGroup.Text>
        <Form.Control
          aria-label="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Имя и цена</InputGroup.Text>
        <Form.Control
          aria-label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Control
          aria-label="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button
          disabled={buttonDisable}
          onClick={() => {
            edit.isEdit
              ? dispatch(
                  editComponent({
                    oldComponent: edit.item,
                    newComponent: { name: name, price: price },
                  })
                )
              : dispatch(addComponent({ name: name, price: price }));
            setName("");
            setPrice("");
            setEdit({ isEdit: false, item: { name: "", price: "" } });
          }}
        >
          {buttonName}
        </Button>
        {edit.isEdit && (
          <Button
            onClick={() => {
              setName("");
              setPrice("");
              setEdit({ isEdit: false, item: { name: "", price: "" } });
            }}
          >
            Отмена
          </Button>
        )}
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Цена</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentArray?.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                {!edit.isEdit && (
                  <>
                    <BsFillPencilFill
                      className="ms-2"
                      onClick={() => {
                        setName(item.name);
                        setPrice(item.price);
                        setEdit({ isEdit: true, item: item });
                      }}
                    />
                    <BsFillTrashFill
                      className="ms-2"
                      onClick={() => dispatch(deleteComponent(item))}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
