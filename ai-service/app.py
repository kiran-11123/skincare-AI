from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route('/', methods=['GET'])
    def health_check():
        return {'status': 'healthy'}, 200

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)