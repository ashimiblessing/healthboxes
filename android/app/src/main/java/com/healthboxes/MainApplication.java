package com.healthboxes;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnfs.RNFSPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.cardio.RNCardIOPackage;
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;
import com.arttitude360.reactnative.rnpaystack.RNPaystackPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new RNFSPackage(),
            new ReactNativeDocumentPicker(),
            new RNCardIOPackage(),
            new RNImmediatePhoneCallPackage(),
            new RNPaystackPackage(),
            new ImagePickerPackage(),
            new VectorIconsPackage()
      );
    }
  };






  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
