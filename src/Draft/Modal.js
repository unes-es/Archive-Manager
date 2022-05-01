{
  tableData.length > 0 && (
    <>
      <Modal show={show} onHide={this.close} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit folder N° : {tableData[selectedRow].number}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input
              name="number"
              text="Number"
              placeholder="Enter folder number"
              value={tableData[selectedRow].number}
              onChange={this.handleChange}
            />
            <Input
              name="title"
              text="Title"
              placeholder="Enter folder title"
              value={tableData[selectedRow].title}
              onChange={this.handleChange}
            />
            <Input
              type="date"
              text="Date"
              name="date"
              value={format(
                new Date(tableData[selectedRow].date),
                "yyyy-MM-dd"
              )}
              onChange={this.handleChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button name="edit" onClick={this.save} variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
