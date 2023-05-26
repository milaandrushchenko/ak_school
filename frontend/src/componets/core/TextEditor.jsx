import ReactQuill, {Quill} from "react-quill";
import BlotFormatter from "quill-blot-formatter";
import "react-quill/dist/quill.snow.css";
import {FormHelperText} from "@mui/material";
import Typography from "@mui/material/Typography";

Quill.register("modules/blotFormatter", BlotFormatter);

const modules = {
    toolbar: [
        [{header: "1"}, {header: "2"}, {font: []}],
        [{size: []}],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            {list: "ordered"},
            {list: "bullet"},
            {indent: "-1"},
            {indent: "+1"}
        ],
        [ "image", "video"],
        [{ link: 'link' }],
        ["clean"]
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false
    },
    blotFormatter: {}
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video"
];

function TextEditor({label, name, value, onChange, error, helperText}) {


    const handleEditorChange = (content) => {
        // Перевіряємо, чи вміст складається тільки з <p><br></p>
        if (content === '<p><br></p>') {
            content = ''; // Якщо так, замінюємо його на пустий рядок
        }
        // Здійснюємо інші дії зі значенням, які вам потрібні
        onChange(content);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '7px'
        }}>
            <Typography variant="subtitle1" component="label"
                        sx={{fontWeight: 'bold', color: 'grey.500'}}>
                {label}
            </Typography>
            <div
                style={{
                    border: error ? "1px solid red" : "1px solid #bdbdbd",
                    borderRadius: "4px",
                    padding: "5px",
                    marginTop: "8px",
                    width: "100%",

                }}
            >
                <ReactQuill
                    name={name}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    onChange={handleEditorChange}
                    value={value}
                    style={{
                        // height: '100px',
                        maxHeight:'250px',
                        overflowY: 'auto', // Додайте полосу прокрутки при необхідності
                    }}
                />

                {error && (
                    <FormHelperText error>{helperText}</FormHelperText>
                )}
            </div>
        </div>

    );
}

export default TextEditor;