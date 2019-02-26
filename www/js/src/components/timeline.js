import m from "mithril";

import Footer from "components/homefooter";

var TimeLine = {
  view: vnode => (
    <section class="p-2">
      <ul class="list list--material overflow-auto content-height">
        {[1, 2, 3, 4].map(item => (
          <li class="list-item list-item--material border-bottom">
            <div class="list-item__left list-item--material__left">
              <img
                class="list-item__thumbnail list-item--material__thumbnail"
                src="https://placekitten.com/g/42/41"
                alt="Cute kitten"
              />
            </div>

            <div class="list-item__center list-item--material__center">
              <div class="list-item__title list-item--material__title">
                Lily
              </div>
              <div class="list-item__subtitle list-item--material__subtitle">
                Very friendly cat some the things i am going to be saying here
                are mostly just some random text that really does not mean
                anything.
                <img
                  class="w-100 rounded mt-2"
                  height="200px"
                  src="https://placekitten.com/g/300/200"
                  alt="Cute kitten"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Footer />
    </section>
  )
};

export default TimeLine;
