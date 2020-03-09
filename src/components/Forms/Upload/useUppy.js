/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import XHRUpload from '@uppy/xhr-upload';
import Uppy from '@uppy/core';

import '@uppy/core/dist/style.css';

export default ({
  onUploadComplete,
  closeModal,
  setIsLoading,
  setPreviewImage,
}) => {
  const [uppy, setUppy] = useState(null);
  const user = useStoreState(state => state.user);

  useEffect(() => {
    const uppyInstance = Uppy({
      meta: { type: 'avatar' },
      restrictions: { maxNumberOfFiles: 1 },
      autoProceed: false,
    });

    uppyInstance.use(XHRUpload, {
      endpoint: config.api.files,
      formData: true,
      fieldName: 'file',
      headers: {
        authorization: user.token,
      },
    });

    uppyInstance.on('complete', result => {
      if (result.successful && result.successful.length) {
        const { body } = result.successful[0].response;

        closeModal();
        setIsLoading(false);
        onUploadComplete(body);
      }
    });

    uppyInstance.on('file-added', file => {
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(file.data);

      setPreviewImage(imageUrl);
    });

    setUppy(uppyInstance);
  }, []);

  return uppy;
};
