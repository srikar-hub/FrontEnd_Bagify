import React, { useState } from "react";
import axios from "axios";
const Admin = () => {
  const [success, setSuccess] = useState("");
  const [form, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    bgcolor: "",
    panelcolor: "",
    textcolor: "",
    company: "Samsonite",
    category: "Male",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("discount", form.discount);
    formData.append("bgcolor", form.bgcolor);
    formData.append("panelcolor", form.panelcolor);
    formData.append("textcolor", form.textcolor);
    formData.append("company", form.company);
    formData.append("category", form.category);

    try {
      const res = await axios.post(
        "http://localhost:4000/product/add",
        formData
      );
      if (res.status === 201) {
        setSuccess("Product Created sucessfully");
      } else {
        setSuccess("Failed to Create");
      }
    } catch (err) {
      setSuccess("An error Occured" + err);
    }
  };

  return (
    <>
      {/* Header */}
      {/* <Header /> */}

      {success && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-md bg-blue-500">
          <span className="inline-block mt-1 mb-1 text-white">{success}</span>
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        <div className="container px-10 py-20 flex flex-grow">
          <div className="w-[25%] flex h-screen flex-col items-start">
            <div className="flex flex-col">
              <a className="block w-fit mb-2" href="#">
                All Products
              </a>
              <a className="block w-fit mb-2" href="#">
                Create new product
              </a>
            </div>
          </div>

          <main className="w-3/4 bg-white p-8 shadow ml-4">
            <h2 className="text-xl font-bold mb-4">Create New Product</h2>
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Product Image
                  </label>
                  <input
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    className="py-2 px-4 rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Product Name"
                    onChange={handleChange}
                    value={form.name}
                    className="border p-2 rounded w-full"
                  />
                  <input
                    name="price"
                    type="text"
                    placeholder="Product Price"
                    onChange={handleChange}
                    value={form.price}
                    className="border p-2 rounded w-full"
                  />
                  <input
                    name="discount"
                    type="text"
                    placeholder="Discount Price"
                    onChange={handleChange}
                    value={form.discount}
                    className="border p-2 rounded w-full"
                  />
                  <select
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="Samsonite">Samsonite</option>
                    <option value="American Tourister">
                      American Tourister
                    </option>
                    <option value="Tumi">Tumi</option>
                    <option value="Wildcraft">Wildcraft</option>
                    <option value="Skybags">Skybags</option>
                    <option value="Wrongn">Wrongn</option>
                    <option value="VIP">VIP</option>
                    <option value="Puma">Puma</option>
                    <option value="Adidas">Adidas</option>
                    <option value="Nike">Nike</option>
                  </select>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Children">Children</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Panel Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="bgcolor"
                    type="text"
                    onChange={handleChange}
                    value={form.bgcolor}
                    placeholder="Background Color"
                    className="border p-2 rounded w-full"
                  />
                  <input
                    name="panelcolor"
                    type="text"
                    onChange={handleChange}
                    value={form.panelcolor}
                    placeholder="Panel Color"
                    className="border p-2 rounded w-full"
                  />
                  <input
                    name="textcolor"
                    type="text"
                    onChange={handleChange}
                    value={form.textcolor}
                    placeholder="Text Color"
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>

              <input
                type="submit"
                value="Create New Product"
                className="px-5 py-2 rounded mt-3 bg-blue-500 text-white cursor-pointer"
              />
            </form>
          </main>
        </div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </>
  );
};

export default Admin;
