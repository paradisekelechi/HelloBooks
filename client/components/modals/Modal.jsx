import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 *
 * @class Modal
 * @extends {React.Component}
 */
class Modal extends React.Component {
  /**
   * Creates an instance of Modal.
   * @param {any} props
   * @memberof Modal
   */
  constructor(props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  /**
   *
   * @returns {void} initializes modal
   * @memberof Modal
   */
  componentDidMount() {
    $('.modal').modal({
      opacity: 0.5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200,
    });
  }

  /**
   *
   * @returns {void} closes the modal
   * @param {any} event
   * @memberof Modal
   */
  handleCloseModal(event) {
    event.preventDefault();
    $(`#${this.props.modaIId}`).modal('close');
  }

  /**
   *
   *
   * @returns {void} renders the modal component
   * @memberof Modal
   */
  render() {
    return (
      <div id={this.props.modaIId} className="modal">
        <div className="modal-content">
          <h5>{this.props.modalTitle}</h5>
          <h6>{this.props.prompt}</h6>
          <div className="row">
            <div className="col m3 offset-m3 s12 xs12">
              <button
                onClick={this.handleCloseModal}
                className="btn dark-blue-background "
              >
                Cancel
              </button>
            </div>
            <div className="col m3 s12 xs12">
              <button
                onClick={this.props.action}
                className="btn dark-blue-background "
              >
                {this.props.actionTitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modaIId: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  actionTitle: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

export default Modal;
