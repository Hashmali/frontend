import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../Avatar";
import { Label } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import Loader from "../Loader";
import ImageFilterFrames from "material-ui/svg-icons/image/filter-frames";

const AddWorker = (props) => {
  let history = useHistory();
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);

  const [previewImage, setPreviewImage] = useState();
  const [previewID, setPreviewID] = useState();
  const [previewDrive, setPreviewDrive] = useState();
  const [pic, setPic] = useState();
  const [idPic, setIdPic] = useState();
  const [drivePic, setDrivePic] = useState();

  const [picUrl, setPicUrl] = useState();
  const [idPicUrl, setIdPicUrl] = useState();
  const [drivePicUrl, setDrivePicUrl] = useState();
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

  const handleImageUpload2 = () => {
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
        setIdPicUrl(image.url);
      })
      .catch((error) => alert("error while uploading..."));
    setLoader(false);
  };

  const handleImageUpload3 = () => {
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
        setDrivePicUrl(image.url);
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
      if (name == "id_img") {
        setPreviewID(e.target.result);
      }
      if (name == "driving_license_img") {
        setPreviewDrive(e.target.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    if (name == "image") {
      setPic(e.target.files[0]);
    }
    if (name == "id_img") {
      setIdPic(e.target.files[0]);
    }
    if (name == "driving_license_img") {
      setDrivePic(e.target.files[0]);
    }
  };

  const [worker, setWorker] = useState({
    first_name: "",
    second_name: "",
    password: "",
    phone: "",
    id_no: "",
    id_img: "",
    driving_license_img: "",
    work_license_israel: "",
    work_license_type: "",
    work_license_expire: "",
    age: "",
    address: "",
    pay_per_day: "",
    email: "",
    image: "",
    is_admin: "",
  });
  const {
    first_name,
    second_name,
    password,
    phone,
    id_no,
    id_img,
    driving_license_img,
    work_license_israel,
    work_license_type,
    work_license_expire,
    age,
    address,
    pay_per_day,
    email,
    image,
    is_admin,
  } = worker;
  const onInputChange = (e) => {
    console.log(e.target.value);

    if (e.target.type == "file") {
      alert(e.target.name);
      setWorker({ ...worker, [e.target.name]: e.target.files[0] });
      imageHandler(e, e.target.name);
    }
    setWorker({ ...worker, [e.target.name]: e.target.value });
  };

  var toke = "Token " + props.token + " ";
  var url = "https://hashmali-backend.herokuapp.com/api/worker/register/";
  var url2 = "https://api.cloudinary.com/v1_1/dj42j4pqu/image/upload";

  function post_request() {
    const newData = new FormData();
    /* 
        first_name, second_name, password, phone, id_no,id_img,driving_license_img,
        work_license_israel,work_license_type,work_license_expire,age,address,
        pay_per_day,email,image,is_admin
        */
    newData.append("first_name", worker.first_name);
    newData.append("second_name", worker.second_name);
    newData.append("password", worker.password);
    newData.append("password2", worker.password);
    newData.append("phone", worker.phone);
    newData.append("id_no", worker.id_no);
    newData.append("work_license_israel", worker.work_license_israel);
    newData.append("work_license_type", worker.work_license_type);
    newData.append("work_license_expire", worker.work_license_expire);
    newData.append("age", worker.age);
    newData.append("address", worker.address);
    newData.append("pay_per_day", worker.pay_per_day);
    newData.append("email", worker.email);
    newData.append("is_admin", worker.is_admin);
    newData.append("is_staff", "true");

    if (pic) {
      handleImageUpload1();
      console.log(picUrl);
      newData.append("image", picUrl);
    }
    if (idPic) {
      handleImageUpload2();
      console.log(idPicUrl);
      newData.append("id_img", idPicUrl);
    }
    if (drivePic) {
      handleImageUpload3();
      console.log(drivePicUrl);
      newData.append("driving_license_img", drivePicUrl);
    }

    const requestOptions = {
      method: "POST",
      headers: { Authorization: toke },
      body: newData,
    };
    return requestOptions;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    //Checking if password and phone are empty
    if (!first_name || !second_name) {
      alert("please provide worker name and last name...");
      return;
    }

    //Checking if password and phone are empty
    if (!password || !phone) {
      alert("please provide phone number and password...");
      return;
    }

    //Israeli phone number
    var regex = /^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
    //Checking if phone number is valid
    if (!regex.test(phone)) {
      alert("please enter a valid phone number...");
      return;
    }

    if (!is_admin) {
      alert("please  set user type...");
      return;
    }

    //Checking if password and phone are empty
    if (!image || !id_img || !driving_license_img) {
      alert("please upload worker profile pic,id and license...");
      return;
    }
    if (id_no.length > 10) {
      alert("ID has more than 10 digits.");
      return;
    }

    const data = await fetch(url, post_request()).catch((error) =>
      console.error(error)
    );
    if (data.status) {
      if (data.status != 201) {
        alert("Error...Please ensure credentials are unique to this user");
      }
      if (data.status == 201) {
        alert("Successfully created worker!");
        history.push("/workers_management");
      }
    }
  };
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
        <Link className="btn btn-dark" to="/workers_management">
          Back to Home
        </Link>

        <h2 className="text-center mb-4">Fill in Worker Details:</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Worker First Name
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker first name"
              name="first_name"
              value={first_name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Worker Last Name
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker last name"
              name="second_name"
              value={second_name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Password
            </Label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter worker password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Phone Number
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker phone number"
              name="phone"
              value={phone}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Email
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </div>

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
          <div className="form-group">
            <Label color="black" as="a" basic>
              Is an admin?
            </Label>
            <select
              className="form-control form-control-lg"
              name="is_admin"
              value={is_admin}
              onChange={(e) => onInputChange(e)}
            >
              <option>Choosing</option>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              age
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker age"
              name="age"
              value={age}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              address
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker address"
              name="address"
              value={address}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Pay per day
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker pay per day"
              name="pay_per_day"
              value={pay_per_day}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Id
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker id"
              name="id_no"
              value={id_no}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Avatar avatarUrl={previewID} />
            <Label color="black" as="a" basic>
              Upload Id image
            </Label>

            <input
              type="file"
              className="form-control form-control-lg"
              placeholder="Upload worker image"
              name="id_img"
              onChange={(e) => onInputChange(e)}
              accept="image/*"
            />
          </div>
          <div className="form-group">
            <Avatar avatarUrl={previewDrive} />
            <Label color="black" as="a" basic>
              Upload driving license image
            </Label>
            <input
              type="file"
              className="form-control form-control-lg"
              placeholder="Upload worker driving license image"
              name="driving_license_img"
              onChange={(e) => onInputChange(e)}
              accept="image/*"
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Israel Work license
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="worker work license israel"
              name="work_license_israel"
              value={work_license_israel}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Israel Work license due date
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Upload worker work license expire date"
              name="work_license_expire"
              value={work_license_expire}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button className="btn btn-dark btn-block">Create Worker</button>
        </form>
      </div>
    </div>
  );
};

export default AddWorker;
