import m from "mithril";

var Modal = {
  content: {},
  view: vnode => (
    <ons-modal>{Modal.content.view ? <Modal.content /> : ""}</ons-modal>
  )
};

export default Modal;
