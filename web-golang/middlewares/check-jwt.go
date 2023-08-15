package middlewares

import (
	"errors"
	"net/http"
	"github.com/julienschmidt/httprouter"
	"github.com/conglt10/web-golang/auth"
	"github.com/conglt10/web-golang/utils"
)

func CheckJwt(next httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		err := jwt.Verify(r)

		if err != nil {
			res.ERROR(w, 401, errors.New("Unauthorized"))
			return
		}

		next(w, r, ps)
	}
}



