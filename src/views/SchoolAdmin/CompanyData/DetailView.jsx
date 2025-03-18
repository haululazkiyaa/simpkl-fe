import { useEffect, useState } from "react";

import Modal from "../../../components/Elements/Modal/index.jsx";
import PropTypes from "prop-types";

export default function CompanyDetailView(props) {
    const { data, selected } = props;

    const [detail, setDetail] = useState({});

    useEffect(() => {
        setDetail(selected?.foto);
    }, [data, selected]);

    return (
        <Modal title="Foto Perusahaan">
        {detail != null ? (
            <>
            <img src={detail} alt="Foto Perusahaan" />
            </>
        ) : (
            <p className="text-center">Tidak Ada Foto</p>
        )}
        </Modal>
    );
}

CompanyDetailView.propTypes = {
    data: PropTypes.any,
    selected: PropTypes.any,
};
