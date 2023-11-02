import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import "../../../estilos/steps/steps.css";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";

const { Option } = Select;
const { TextArea } = Input;

function StepTwo({
  phoneNumber,
  setPhoneNumber,
  isCompany,
  companyName,
  setCompanyName,
  setCurrentStep,
  currentStep,
  selectedCountry,
  setSelectedCountry,
  image,
  setImage,
  bio,
  setBio,
}) {
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?lang=es"
        );
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const estadoImagen = (event) => {
    const file = event.target.files[0];
    if (!file) {
      Swal.fire("Error", "Por favor, seleccione una imagen.", "error");
      return;
    }

    const fileName = file.name;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    const allowedExtensions = ["png", "jpg", "jpeg"];

    if (!allowedExtensions.includes(fileExtension)) {
      Swal.fire(
        "Error",
        "Por favor, seleccione un archivo de imagen válido (png, jpg, jpeg).",
        "error"
      );
      return;
    }

    setImage(file);
  };
  
  const estadoPais = (value) => {
    const country = countries.find((c) => c.name.common === value);
    if (country) {
      setSelectedCountry(country.name.common);
      setIsCountrySelected(true);
      setPhoneNumber("");
    }
  };

  const estadoSeguir = () => {
    if (!image) {
      Swal.fire("Error", "Por favor, seleccione una imagen.", "error");
      return;
    }
    if (isCompany) {
      if (!companyName || !isCountrySelected || !phoneNumber || !bio) {
        Swal.fire(
          "Error",
          "Por favor llene todos los campos requeridos para la compañía.",
          "error"
        );
        return;
      }
    } else {
      if (!isCountrySelected || !phoneNumber) {
        Swal.fire(
          "Error",
          "Por favor llene todos los campos requeridos.",
          "error"
        );
        return;
      }
    }

    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="step-content">
      <div className="step-two-content">
        <div className="step-content-left">
          <h5>Informacion personal</h5>
          <p>
            Por favor llene todos los campos que se le piden. Sea cuidadoso, es
            su informacion.
          </p>
        </div>
        <div className="step-content-right">
          <div className="image-upload-container">
            <label htmlFor="profile-upload" className="image-upload-label">
              {image ? (
                <div
                  className="image-upload"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(image)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              ) : (
                <div className="image-upload">
                  <div className="image-upload-icon">
                    <PlusOutlined />
                  </div>
                </div>
              )}
              <p>Agregar foto de perfil</p>
            </label>
            <input
              type="file"
              id="profile-upload"
              className="image-upload-input"
              onChange={estadoImagen}
              required
            />
          </div>

          {isCompany && (
            <Input
              placeholder="Nombre de la Compañía"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="input-step-dos"
              required
            />
          )}

          {isCompany && (
            <Input
              placeholder="Nombre completo de persona a cargo"
              className="input-step-dos"
              required
            />
          )}

          <Select
            showSearch
            style={{
              width: "100%",
              marginTop: "20px",
              textAlign: "initial",
            }}
            placeholder={selectedCountry || "Seleccione su país de nacimiento"}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={estadoPais}
            required
            value={selectedCountry}
          >
            {!loading &&
              countries.map((country, index) => (
                <Option key={index} value={country.name.common}>
                  {country.name.common}
                </Option>
              ))}
          </Select>

          <div className="phone-input-container">
            <div className="custom-phone-input">
              <PhoneInput
                inputProps={{
                  name: "phone",
                  required: true,
                }}
                value={phoneNumber}
                country="co"
                onChange={(value, country, e, formattedValue) =>
                  setPhoneNumber(formattedValue)
                }
                buttonClass="custom-phone-button"
                required
              />
            </div>
          </div>

          <TextArea
            placeholder="Breve descripción del profesor"
            className="input-step-dos"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            autoSize={{ minRows: 3, maxRows: 6 }}
            required
          />

          <div className="step-button-group">
            <button
              className="step-back-button"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              <ArrowLeftOutlined /> Atrás
            </button>
            <button
              type="primary"
              onClick={estadoSeguir}
              className="boton-primer-step"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepTwo;
