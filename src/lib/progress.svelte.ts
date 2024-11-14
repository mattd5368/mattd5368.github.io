class Progress {
  #state = $state({ flags: "", shamir: "" });

  constructor() {
    const raw_state = window.localStorage.getItem("puzzle-progress");
    if (raw_state) {
      this.#state = JSON.parse(raw_state);
    }
  }

  get current() {
    return this.#state;
  }

  set current(v) {
    this.#state = v;
    window.localStorage.setItem("puzzle-progress", JSON.stringify(v));
  }
}

export const progress = new Progress();

export const flags_answer = "9ad0f1f34714c9dbf86ffbe4fbf9b26d490606956aeb608709e5892d30bc4c52";
export const shamir_check = "5734a581ceda2f2d4b44c2f2a3dd4261ca4077189a9ae6a26307334d20b6edf4";
export const cipher_text =
  "660a4e9620e52f21cbb39fcc4c21e5d91b0fa091c2fb3f4fc769e872a88b57e6b67721304212d52584e2a1b21ff508b3191533e50bc7db9579dc79a7fe419eaa5c58b1046c3313a99f8428359f8f209a8917f15f3a118763f660919b1af416d2ebaf1873329cd10da528f1b81f8dbff732";
