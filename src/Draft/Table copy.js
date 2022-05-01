import { format } from "date-fns";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

const TableHeader = (props) => {
  const header = props.header.map((row) => {
    return <th>{row}</th>;
  });
  return (
    <thead>
      <tr>
        {props.check && (
          <th>
            <input type="checkbox" onChange={(e) => props.check(e)} />
          </th>
        )}
        {header}
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  const rows = props.data.map((row, index) => {
    return (
      <tr
        className="clickable-row"
        onChange={() => {}}
        onClick={(e) => {
          props.viewFiles(index);
        }}
        style={{ cursor: "pointer" }}
        key={index}
      >
        {props.check && (
          <td>
            <input
              checked={row.selected}
              type="checkbox"
              onChange={() => {}}
              onClick={(e) => props.select(e, index)}
            />
          </td>
        )}
        <td>{row.number}</td>
        <td>{row.title}</td>
        <td>{format(new Date(row.date), "dd/MM/yyyy")}</td>
        <td>{row.progress}</td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={(e) => props.remove(e, index)}
          >
            Delete
          </button>
          <span> </span>
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => props.showModal(e, index)}
          >
            Edit
          </button>
          <span> </span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={(e) => props.showConfirmationModal(e, index)}
          >
            Archive
          </button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

const Table = (props) => {
  const {
    data,
    remove,
    showModal,
    select,
    check,
    viewFiles,
    showConfirmationModal,
    header,
  } = props;
  return (
    <table className="table table-striped table-hover responsive">
      <TableHeader check={check} header={header} />
      <TableBody
        data={data}
        remove={remove}
        select={select}
        showModal={showModal}
        showConfirmationModal={showConfirmationModal}
        check={check}
        viewFiles={viewFiles}
      />
    </table>
  );
};

export default Table;
