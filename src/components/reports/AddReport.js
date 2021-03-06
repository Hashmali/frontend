import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../Avatar";
import { Label } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import Loader from "../Loader";
import ImageFilterFrames from "material-ui/svg-icons/image/filter-frames";
import DatePicker from "react-date-picker";
import { TimePicker } from "antd";
import "antd/dist/antd.css";

import moment from "moment";

const AddReport = (props) => {
  let history = useHistory();
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const [projects, setProjects] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [previewImage, setPreviewImage] = useState();
  const [pic, setPic] = useState();
  const [picUrl, setPicUrl] = useState();

  const handleImageUpload1 = () => {
    console.log(pic);
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "hashmaliProject");
    data.append("cloud_name", "dj42j4pqu");
    setLoader(true);
    fetch(url2, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((image) => {
        setPicUrl(image.url);
      })
      .catch((error) => alert("error while uploading..."));
    setLoader(false);
  };

  const imageHandler = (e, name) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      if (name == "image") {
        setPreviewImage(e.target.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    if (name == "image") {
      setPic(e.target.files[0]);
    }
  };

  const [report, setReport] = useState({
    title: "",
    description: "",
    project: "",
    image: "",
  });
  const { title, description, project, image } = report;
  const onInputChange = (e) => {
    console.log(e.target.value);

    if (e.target.type == "file") {
      alert(e.target.name);
      setReport({ ...report, [e.target.name]: e.target.files[0] });
      imageHandler(e, e.target.name);
    }
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  function handleSelect(e) {
    let { name, value } = e.target;
    console.log(name);
    console.log(value);
    setReport({ ...report, [name]: parseInt(value) });
    console.log(report);
  }

  var toke = "Token " + props.token + " ";
  var workerID = props.id;
  var url = "https://hashmali-backend.herokuapp.com/api/report/create/";
  var url2 = "https://api.cloudinary.com/v1_1/dj42j4pqu/image/upload";
  var url3 = "https://hashmali-backend.herokuapp.com/api/project/";

  function post_request() {
    const newData = new FormData();
    /* 
    title,
    description,
    start_hour,
    ending_hour,
    project,
    image,  

        */
    newData.append("title", report.title);
    newData.append("worker", workerID);
    newData.append("description", report.description);

    let djangoFormatDate =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();

    console.log(djangoFormatDate);
    newData.append("date", djangoFormatDate);

    let djangoFormatStartTime =
      startTime.hour() + ":" + startTime.minute() + ":" + startTime.seconds();
    newData.append("start_hour", djangoFormatStartTime);
    let djangoFormatEndTime =
      endTime.hour() + ":" + endTime.minute() + ":" + endTime.seconds();
    newData.append("ending_hour", djangoFormatEndTime);
    newData.append("project", report.project);
    newData.append("image", report.image);
    if (pic) {
      handleImageUpload1();
      console.log(picUrl);
      newData.append("image", picUrl);
    }

    const requestOptions = {
      method: "POST",
      headers: { Authorization: toke },
      body: newData,
    };
    return requestOptions;
  }
  const requestOptions2 = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //Checking if password and phone are empty
    if (!title) {
      alert("please provide report title...");
      return;
    }
    //Checking if password and phone are empty
    if (!description) {
      alert("please provide report details...");
      return;
    }
    if (!startDate) {
      alert("please provide date...");
      return;
    }
    if (!startTime) {
      alert("please provide start time...");
      return;
    }
    if (!endTime) {
      alert("please provide finish time...");
      return;
    }
    if (startTime && endTime && endTime.isBefore(startTime)) {
      alert("start hour can't be greater than finish time...");
      return;
    }

    //Checking if password and phone are empty
    if (!image) {
      alert("please upload image...");
      return;
    }
    if (!project) {
      alert("please choose a project...");
      return;
    }

    const data = await fetch(url, post_request()).catch((error) =>
      console.error(error)
    );
    if (data.status) {
      if (data.status != 201) {
        alert(data.status);
      }
      if (data.status == 201) {
        alert("Successfully created report!");
        history.push("/reports");
      }
    }
  };

  const loadProjects = async () => {
    const data = await fetch(url3, requestOptions2).catch((error) =>
      console.error(error)
    );

    setStatus(data.status);
    const projects_data = await data.json();
    setProjects(projects_data);
  };

  useEffect(() => {
    if (props.token) {
      loadProjects();
    }
  }, [props.token]);

  if (loader) {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Loader />
        </Grid.Column>
      </Grid>
    );
  }

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <Link className="btn btn-dark" to="/reports">
          Back to Home
        </Link>

        <h2 className="text-center mb-4">Fill in Report Details:</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Title
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter report title"
              name="title"
              value={title}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Description
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter report content"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Date
            </Label>

            <DatePicker
              className="form-control form-control-lg"
              value={startDate}
              onChange={(date) => setStartDate(date)}

              // onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Start Hour
            </Label>
            <div className="form-group">
              <TimePicker
                className="form-control form-control-lg"
                defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                onChange={(value) => setStartTime(value)}
              />
            </div>
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Finish Hour
            </Label>
            <div className="form-group">
              <TimePicker
                className="form-control form-control-lg"
                defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                onChange={(value) => setEndTime(value)}
              />
            </div>
          </div>

          <h4 className="text-center mb-4">Project</h4>
          <div>
            <select
              class="form-select"
              className="form-control form-control-lg"
              name={"project"}
              onChange={handleSelect}
            >
              <option>please choose a project:</option>
              {projects
                ? projects.map((project) => (
                    <option value={project.id}>{project.project_code}</option>
                  ))
                : ""}
            </select>
          </div>
          <h4 className="text-center mb-4">Photo</h4>

          <div className="form-group">
            <Avatar avatarUrl={previewImage} />
            <Label color="black" as="a" basic>
              Upload a photo
            </Label>

            <input
              type="file"
              name="image"
              onChange={(e) => onInputChange(e)}
              accept="image/*"
            />
          </div>

          <button className="btn btn-dark btn-block">Create Report</button>
        </form>
      </div>
    </div>
  );
};

export default AddReport;
