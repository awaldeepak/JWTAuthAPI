const invalidPathController = {

    invalid(req, res, next) {
        res.status(404).json({
            status: 'Request failed',
            message: 'Invalid path',
          });
    }
}

export default invalidPathController;