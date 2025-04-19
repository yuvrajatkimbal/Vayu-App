import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import MainWrapper from "../component/MainWrapper";
import { useDispatch } from "react-redux";
import { handleActiveSessionAction, loginAction } from "../../../api/auth";
import { useNavigate } from "react-router";
import { encryptMessage, setLocalStorage } from "../../../utils/helper";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { showToast } from "../../../customHooks/ToastEmitter";
import CustomBackdrop from "../../../components/CustomBackdrop/CustomBackdrop";

const index = () => {
  let secretKey =
    "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFt4U5sB+I3fi4GATqnJYbTuPo1hrzZR0y4zolF6UA2EWvZMRoslvZJP8wqV4iwPFhSBXNj+bEPolnL117DGWgXIroN0NV1vF51FcdbYZXP8MltY4XNnzelawsnzeKwHqtg3I0wj5DfxmYDTlCjgdKhdABdg91T1+WZeeR0mpyH9AgMBAAE=";
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const navigate = useNavigate();

  const clearCache = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });

    window.localStorage.clear();
    window.sessionStorage.clear();
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setEmailError(false);
    setEmailErrorMessage("");
    setPasswordError(false);
    setPasswordErrorMessage("");

    // Track if there's any validation error
    let hasError = false;

    // Basic validation
    if (!email) {
      setEmailError(true);
      setEmailErrorMessage("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email");
      hasError = true;
    }

    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage("Password is required");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("Password should be at least 8 characters long");
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      try {
        clearCache();
        const res = await dispatch(
          loginAction({
            userName: email,
            password: encryptMessage(password, secretKey),
            grantType: "password",
            refreshToken: ""
          })
        );
        if (!res?.accessToken) {
          const res = await dispatch(
            handleActiveSessionAction({
              userName: email,
              password: encryptMessage(password, secretKey),
              userWantsNewSession: true
            })
          );

          if (res?.accessToken) {
            setLoading(false);
            showToast(res.message, {
              appearance: "success"
            });
            setLocalStorage("userName", email);
            navigate("/");
            localStorage.setItem("activeProject", "HES Vayu");
          }

          if (!res) {
            setLoading(false);
            navigate("/login");
          }
        } else {
          showToast(res.message, {
            appearance: "success"
          });
          setLoading(false);
          setLocalStorage("userName", email);
          navigate("/");

          localStorage.setItem("activeProject", "HES Vayu");
        }
      } catch (err) {
        setLoading(false);
        showToast((err as any)?.data?.message || "An error occurred", {
          appearance: "error"
        });
      }
    }
  };

  // Email validation function
  const validateEmail = (email: string) => {
    // Simple regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      {loading && <CustomBackdrop open={loading} />}
      <MainWrapper label={"Login"} submitHandler={handleSubmit}>
        <Box>
          <Box mt={3} mb={2}>
            <Typography className="f-25"> Login </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2
            }}
          >
            {/* Email Field */}
            <FormControl fullWidth>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                className="custom-textfield f-10"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(false);
                  setEmailErrorMessage("");
                }}
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>

            {/* Password Field */}
            <FormControl variant="outlined" error={passwordError}>
              <OutlinedInput
                id="outlined-adornment-password"
                name="Password"
                sx={{ borderRadius: 0 }}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                  setPasswordErrorMessage("");
                }}
                required
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      // className="custom-textfield"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordError && (
                <FormHelperText>{passwordErrorMessage}</FormHelperText>
              )}
            </FormControl>
            {/* Forgot Password */}
            {/* <Box mt={2} mb={2}>
              <Typography
                className="f-15"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  // Your forgot password logic here
                  console.log("Forgot password clicked");
                }}
              >
                <u>Forgot password</u>
              </Typography>
            </Box> */}
          </Box>
        </Box>
      </MainWrapper>
    </>
  );
};

export default index;
