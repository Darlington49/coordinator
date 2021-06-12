// using exec / spawn
//when Success Fail Done

//Read product => read firmware => get link => GET LInk to do
//Insertion in the database => flashing request => controlleur log DOING
const sequelize = require("sequelize");
const { spawn, exec } = require("child_process");

const ProductTypes = require("../models/ProductTypes");
const Firmware = require("../models/Firmware");

let status = false;
let rootcause = null;

const flashingAPIget = (req, res) => {
  ProductTypes.findAll()
    .then((products) => {
      res.render("flashAPI/flash", {
        prods: products,
        pageTitle: "All Products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// app.get("/flash", (req, res) => {
flashingAPI2 = (req, res) => {
  console.log("Hello World!");
  firmware_link = "blink.bin";
  ftdi_link = "debug/ftdi_ft2322.cfg";
  mcu_module = "debug/esp-wroom-32.cfg";
  final_cmd = `openocd -f  ${ftdi_link} -f ${mcu_module} -c "program_esp32 ${firmware_link} 0x10000  verify exit;reset;shutdown;"`;
  final_cmd = `openocd -f  debug/ftdi_ft2322.cfg -f debug/esp-wroom-32.cfg -c "read_mac_esp32; program_esp32 blink.bin 0x10000 verify exit; reset;shutdown"`;

  console.log(final_cmd);
  //   `openocd -f  debug/ftdi_ft2322.cfg -f debug/esp-wroom-32.cfg -c "program_esp32 build/blink.bin 0x10000  verify exit;reset;shutdown;"`,
  exec(final_cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      //status = "failed";
      log = error.message;
      log = stderr;
      console.log(`_____________log:_______________\n ${log}`);
      n = log.includes("** Programming Finished **");
      console.log(">>>>>>>>>>>>>>>>>>>>>>>" + n + "<<<<<<<<<<<<<<<<");
      n ? (status = "flashed") : (status = "failed");

      if (status === "failed") {
        if (log.includes("Error: unable to open ftdi device"))
          rootcause = "Debuger";
        if (
          log.includes(
            "Error: JTAG scan chain interrogation failed: all zeroes"
          )
        )
          rootcause = "ESP";
      } else rootcause = "";
      console.log("status:\t", status);
      console.log("rootcause:\t", rootcause);
      return;
    }
    if (stderr) {
      // console.log(`stderr: ${stderr}`);
      log = stderr;
      console.log(`_____________log:_______________\n ${log}`);
      n = log.includes("** Programming Finished **");

      n ? (status = "flashed") : (status = "failed");
      console.log(">>>>>>>>>>>>>>>>>>>>>>>" + n + "<<<<<<<<<<<<<<<<");
      console.log(">>>>>>>>>>>>>>>>>>>>>>>" + status + "<<<<<<<<<<<<<<<<");
      if (status === "failed") {
        if (log.includes("Error: unable to open ftdi device"))
          rootcause = "Debuger";
        if (
          log.includes(
            "Error: JTAG scan chain interrogation failed: all zeroes"
          )
        )
          rootcause = "ESP";
      } else if (status === "flashed") {
        rootcause = "";
      }
      console.log("status:\t", status);
      console.log("rootcause:\t", rootcause);
      return;
    }
    if (stdout) {
      console.log(`log stdout :\n ${stdout}`);
      const words = stdout.split(" ");
      mac = words[1];
      console.log("mac adress : ", mac);
    }
    //console.log(`stdout: ${stdout}`);
    //console.log(`log:\n ${stdout}`);
    //log  = stdout;
  });

  res.send("Flash Done!");
};

flashingAPI = (req, res) => {
  FlashingRequestRecordId = 0;
  console.log(req.body);
  ProductTypeId = req.body.ProductTypes;
  mac = null;
  log = null;
  ProductTypes.findAll({
    where: {
      id: ProductTypeId,
    },
  })
    .then((product) => {
      // console.log("========product===========>", product[0]);
      // console.log(product[0].dataValues);
      FirmwareId = product[0].dataValues.FirmwareId;

      Firmware.findAll({
        where: {
          id: FirmwareId,
        },
      })
        .then((firmware) => {
            console.log(firmware[0].dataValues);
           FirmwareLink = firmware[0].dataValues.Link;
          //firmware_link = "blink.bin";
          ftdi_link = "debug/ftdi_ft2322.cfg";
          mcu_module = "debug/esp-wroom-32.cfg";
          final_cmd = `openocd -f  ${ftdi_link} -f ${mcu_module} -c "read_mac_esp32; program_esp32 ${FirmwareLink} 0x10000  verify exit;reset;shutdown;"`;
          //final_cmd = `openocd -f  debug/ftdi_ft2322.cfg -f debug/esp-wroom-32.cfg -c "read_mac_esp32; program_esp32 blink.bin 0x10000 verify exit; reset;shutdown"`;
          // console.log(final_cmd);
          //   `openocd -f  debug/ftdi_ft2322.cfg -f debug/esp-wroom-32.cfg -c "program_esp32 build/blink.bin 0x10000  verify exit;reset;shutdown;"`,
          exec(final_cmd, (error, stdout, stderr) => {
            if (error) {
              // console.log(`error: ${error.message}`);
              //status = "failed";
              log += error.message;
              //log = stderr;
              console.log(`_____________log:_______________\n ${log}`);
              n = log.includes("** Programming Finished **");
              console.log(">>>>>>>>>>>>>>>>>>>>>>>" + n + "<<<<<<<<<<<<<<<<");
              n ? (status = "flashed") : (status = "failed");

              if (status === "failed") {
                if (log.includes("Error: unable to open ftdi device"))
                  rootcause = "Debuger";
                if (
                  log.includes(
                    "Error: JTAG scan chain interrogation failed: all zeroes"
                  )
                )
                  rootcause = "ESP";
              } else rootcause = "";
            }
            if (stderr) {
              // console.log(`stderr: ${stderr}`);
              log += stderr;
              //  console.log(`_____________log:_______________\n ${log}`);
              n = log.includes("** Programming Finished **");

              n ? (status = "flashed") : (status = "failed");
              console.log(">>>>>>>>>>>>>>>>>>>>>>>" + n + "<<<<<<<<<<<<<<<<");
              console.log(
                ">>>>>>>>>>>>>>>>>>>>>>>" + status + "<<<<<<<<<<<<<<<<"
              );
              if (status === "failed") {
                if (log.includes("Error: unable to open ftdi device"))
                  rootcause = "Debuger";
                if (
                  log.includes(
                    "Error: JTAG scan chain interrogation failed: all zeroes"
                  )
                )
                  rootcause = "ESP";
              } else if (status === "flashed") {
                rootcause = "";
              }
            }
            if (stdout) {
              // console.log(`log stdout :\n ${stdout}`);
              log += stdout;
              const words = stdout.split(" ");
              mac = words[1];
              //  console.log("mac adress : ", mac);
            }
            product[0]
              .createFlashingRequest({
                ProductMacAdress: mac,
              })
              .then((FlashReq) => {
                //  console.log("=======FlashReq============>", FlashReq);
                FlashingRequestRecordId = FlashReq.dataValues.id;
                FlashReq.createControllerLog({
                  status,
                  rootcause,
                  log,
                  Time: sequelize.literal("CURRENT_TIMESTAMP"),
                });
              });
            console.log("mac:\t", mac);
            console.log("status:\t", status);
            console.log("rootcause:\t", rootcause);
            res.send(status);
            // console.log(`log:\n ${stdout}`);
            //log  = stdout;
          });
        })
        .catch((err) => console.log(err));
      //res.send(product.FirmwareId);
    })
    .catch((err) => console.log(err));
  // res.send("hi");
};

module.exports = {
  flashingAPIget,
  flashingAPI,
};

// no ftdi "Error: unable to open ftdi device"
// no esp "Error: JTAG scan chain interrogation failed: all zeroes"

/*
FTDI and ESP Not Pluged in
Warn : Transport "jtag" was already selected
Warn : Transport "jtag" was already selected
Info : Configured 2 cores
Error: no device found
Error: unable to open ftdi device with vid 0403, pid 6010, description '*', serial '*' at bus location '*'
** OpenOCD init failed **
shutdown command invoked

Assertion failed!

Program: C:\Users\HP\.espressif\tools\openocd-esp32\v0.10.0-esp32-20200709\openocd-esp32\bin\openocd.exe
File: src/jtag/core.c, Line 343

Expression: jtag_trst == 0*/

/*

FTDI withou chip 
Open On-Chip Debugger  v0.10.0-esp32-20200709 (2020-07-09-08:54)
Licensed under GNU GPL v2
For bug reports, read
        http://openocd.org/doc/doxygen/bugs.html
adapter speed: 200 kHz

Warn : Transport "jtag" was already selected
Warn : Transport "jtag" was already selected
Info : Configured 2 cores
Info : Listening on port 6666 for tcl connections
Info : Listening on port 4444 for telnet connections
Info : ftdi: if you experience problems at higher adapter clocks, try the command "ftdi_tdo_sample_edge falling"
Info : clock speed 20000 kHz
Error: JTAG scan chain interrogation failed: all zeroes
Error: Check JTAG interface, timings, target power, etc.
Error: Trying to use configured scan chain anyway...
Error: esp32.cpu0: IR capture error; saw 0x00 not 0x01
Warn : Bypassing JTAG setup events due to errors
Info : Listening on port 3333 for gdb connections
shutdown command invoked
Error: libusb_handle_events() failed with LIBUSB_ERROR_IO
Error: unable to purge ftdi rx buffers: LIBUSB_ERROR_IO
Error: error while flushing MPSSE queue: -4
Error: Failed to clear OCDDCR_ENABLEOCD!
Error: libusb_handle_events() failed with LIBUSB_ERROR_IO
Error: unable to purge ftdi rx buffers: LIBUSB_ERROR_IO
Error: error while flushing MPSSE queue: -4
Error: Failed to clear OCDDCR_ENABLEOCD!

*/
