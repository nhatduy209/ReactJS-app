var listnote;
class Note extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ghichu: [""]
        }
        listnote = this
        this.AddNote = this.AddNote.bind(this)
    }

    AddNote() {
        // this.state.ghichu.push(this.refs.ghichutxt.value)
        // this.setState(this.state.ghichu)
        console.log(listnote.state.ghichu)
        $.post('/addnotes', { note: this.refs.ghichutxt.value }, function (data) {
            listnote.setState({ ghichu: data })
        })
    }
    render() {
        return (
            <div className="viewTitle">
                <input type="text" ref="ghichutxt" placeholder="ghi chú ở đây !!!" />
                <button onClick={this.AddNote}> Thêm ghi chú </button>
                <div>
                    {this.state.ghichu.map(function (note, index) {
                        if (note.length !== 0) {
                            return (
                                <SingleNote key={index} idNote={index}> {note} </SingleNote>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
    componentDidMount() {
        var that = this   // tạo 1 biến that để lấy dữ liệu từ this ở trên
        $.post("/getnotes", function (data) {   // call jquery to get data form servver 
            that.setState({ ghichu: data })
        })
    }
}

// delete note 
class SingleNote extends React.Component {
    delete(id) {
        console.log(listnote)
        $.post('/deletenotes', { idXoa: id }, function (data) {
            listnote.setState({ ghichu: data })
        })
    }

    editnote(props) {
        ReactDOM.render(<EditNote idEdit={props} />, document.getElementById(props))
    }
    render() {
        return (
            <div>
                <p className="viewNote" > {this.props.children}</p>
                <button onClick={() => this.delete(this.props.idNote)}> Xóa ghi chú</button>
                <button id="editnotes" onClick={() => this.editnote(this.props.idNote)}> Sửa ghi chú </button>
                <div id={this.props.idNote}></div>
            </div>

        )
    }

}

// Edit note 
class EditNote extends React.Component {
    submit(id) {
        $.post("/editnotes", { idSua: id, idTxt: this.refs.text.value }, function (data) {
            listnote.setState({ ghichu: data })
        })
    }
    render() {
        return (
            <div id="editID">
                <input type="text" placeholder="add ghi chú here !!!" ref="text"></input>
                <button onClick={() => this.submit(this.props.idEdit)}> Submit</button>
            </div>
        )
    }
}




ReactDOM.render(
    <Note />,
    document.getElementById("root")
)