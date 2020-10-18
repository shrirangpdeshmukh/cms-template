import React , {Component} from 'react';
import Modal from './Modal/Modal'
import Button from 'components/CustomButton/CustomButton';

class blacklistModal extends Component {
        render() {
            return (
                <Modal show = "1" modalClosed = "1">
                    <p>Are you sure you want to blacklist the below user ?</p>
                    <hr />
                    <table>
                        <tr>
                        <td><b>Name :</b></td>
                        <td>Bysani R Navaneeth</td>
                        </tr>
                        <tr>
                        <td><b>Email :</b></td>
                        <td>brn14@iitbbs.ac.in</td>
                        </tr> 
                    </table>
                    <br />
                    <Button bsStyle="danger" fill block>Yes, Go ahead</Button> 
                    <Button bsStyle="success" fill block>Nope, Go back</Button>
                </Modal>
            )
        }
}

export default blacklistModal;