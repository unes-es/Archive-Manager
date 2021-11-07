const TableHeader = (props) => {
  const header = props.header.map((row) => {
    return <th>{row}</th>;
  });
  return (
    <thead>
      <tr>
        {props.selectAll && (
          <th>
            <input type="checkbox" onChange={(e) => props.selectAll(e)} />
          </th>
        )}
        {header}
        {props.actions && <th>Actions</th>}
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  const rows = props.data.map((row, index) => {
    const columns = props.columns.map((column) => {
      return <td>{row[column]}</td>;
    });
    return (
      <tr
        className="clickable-row"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (props.view !== undefined) props.view(row);
        }}
        Style="cursor: pointer;"
        key={index}
      >
        {props.select && (
          <td>
            <input
              checked={row.selected}
              type="checkbox"
              onChange={() => {}}
              onClick={(e) => props.select(e, row.id)}
            />
          </td>
        )}
        {columns}
        {props.actions !== undefined && <td>{props.actions(row)}</td>}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

const Table = (props) => {
  const { data, select, selectAll, view, header, columns, actions } = props;
  return (
    <table class="table table-striped table-hover responsive">
      <TableHeader actions={actions} selectAll={selectAll} header={header} />
      <TableBody
        data={data}
        select={select}
        view={view}
        columns={columns}
        actions={actions}
      ></TableBody>
    </table>
  );
};

export default Table;
