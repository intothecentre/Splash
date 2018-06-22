

class Helper{
static GetEventFileType(FileExt)
        {
            var FileType;
            if (FileExt == ".html")
                FileType = "html";
            if (FileExt == ".mov" || FileExt == ".mpeg" || FileExt == ".mpg" || FileExt == ".mp4" || FileExt == ".mp3" || FileExt == ".wmv" || FileExt == ".flv" || FileExt == ".avi")
                FileType = "mov";
            if (FileExt == ".pptx" || FileExt == ".ppt")
                FileType = "ppt";

            return FileType;
        }
}

module.exports = { Helper };
