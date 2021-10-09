import React, { useRef } from "react";

const TableHeader = (props) => {
  return (
    <thead>
      <tr>
        <th>
          <input type="checkbox" onChange={(e) => props.check(e)} />
        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Manage</th>
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  const rows = props.data.map((row, index) => {
    return (
      <tr key={index}>
        <td>
          <input
            className="selectRow"
            name
            checked={row.selected}
            type="checkbox"
            onChange={() => props.select(index)}
          />
        </td>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => props.remove(index)}
          >
            Delete
          </button>
          <span> </span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => props.showModal(index)}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

const Table = (props) => {
  const { data, remove, showModal, select, check } = props;
  return (
    <table class="table table-striped table-hover">
      <TableHeader check={check} />
      <TableBody
        data={data}
        remove={remove}
        select={select}
        showModal={showModal}
        check={check}
      />
    </table>
  );
};

export default Table;
