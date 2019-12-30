import React from 'react'
import Modal from 'react-modal'

export default function StudentContractPopup() {
    return(
        <Modal>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}