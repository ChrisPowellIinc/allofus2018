import m from "mithril";
import Footer from "components/homefooter";
import Header from "components/homeheader";

import Modal from "components/modal";

var Shell = {
  view: vnode => {
    const { children } = vnode;
    return (
      <section>
        <Header />
        <Modal />
        <section>{children}</section>
        <Footer />
      </section>
    );
  }
};

export default Shell;
