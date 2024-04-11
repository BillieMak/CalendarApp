import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCalendarStore, useForm, useUiStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const initialForm = {
  title: "David",
  notes: "Rivera",
  start: new Date(),
  end: addHours(new Date(), 3),
};

export const CalendarModal = () => {
  const { closeDateModal } = useUiStore();

  // const [isOpen, setIsOpen] = useState(true);
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();
  const {
    title,
    notes,
    start,
    end,
    onInputChange,
    onDateChange,
    formSumitted,
    setFormSumitted,
    formValues,
    setFormValues,
  } = useForm(initialForm);

  const titleClass = useMemo(() => {
    if (!formSumitted) return "";
    return title.length > 0 ? "is-valid" : "is-invalid";
  }, [title, formSumitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onCloseModal = () => {
    closeDateModal();
    console.log("cerrando modal");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSumitted(true);
    const diffrence = differenceInSeconds(end, start);

    if (isNaN(diffrence) || diffrence <= 0) {
      Swal.fire("Error de Fechas", "Revisar la fechas", "error");
      return;
    }

    if (formValues.title.length <= 0) return;

    // console.log(formValues);
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSumitted(false)
  };

  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={start}
            className="form-control"
            onChange={(event) => {
              onDateChange(event, "start");
            }}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={start}
            selected={end}
            className="form-control"
            onChange={(event) => {
              onDateChange(event, "end");
            }}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            autoComplete="off"
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
