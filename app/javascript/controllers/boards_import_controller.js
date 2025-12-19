import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "checkbox", "defaultButton", "hiddenField", "toggleButton" ]

  connect() {
    this.syncFromHiddenField()
  }

  toggle() {
    if (this.checkboxTarget.checked) {
      if (this.hiddenValue() === "") {
        this.checkboxTarget.checked = false
        if (this.hasToggleButtonTarget) this.toggleButtonTarget.click()
      }
      return
    }

    this.clearSelection()
  }

  selectChanged() {
    this.syncFromHiddenField()
  }

  syncFromHiddenField() {
    this.checkboxTarget.checked = this.hiddenValue() !== ""
  }

  clearSelection() {
    if (this.hasDefaultButtonTarget) {
      this.defaultButtonTarget.click()
      return
    }

    const field = this.hiddenField()
    if (!field) return

    field.value = ""
    field.disabled = true
  }

  hiddenValue() {
    return this.hiddenField()?.value || ""
  }

  hiddenField() {
    if (this.hasHiddenFieldTarget) return this.hiddenFieldTarget
    return this.element.querySelector("input[name='import_columns_from_board_id']")
  }
}
