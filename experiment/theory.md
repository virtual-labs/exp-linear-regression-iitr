#### **Introduction**

Linear regression is a statistical modeling technique used to analyze the relationship between a dependent variable and one or more independent variables. It assumes a linear relationship between these variables and aims to find the best-fitting line that accurately represents the data. This method is fundamental in data analysis and predictive modeling due to its straightforward approach to modeling relationships. Linear regression operates under the assumption that changes in the dependent variable are proportional to changes in the independent variable(s).

#### **Classification and Regression**
Classification predictive modeling problems are different from regression predictive modeling problems.
* Classification is the task of predicting a discrete class label.
* Regression is the task of predicting a continuous quantity.<br>

There is some overlap between the algorithms for classification and regression; for example:
* A classification algorithm may predict a continuous value, but the continuous value is in the form of a probability for a class label.
* A regression algorithm may predict a discrete value, but the discrete value in the form of an integer quantity.<br>

Some algorithms can be used for both classification and regression with small modifications, such as decision trees and artificial neural networks. Some algorithms cannot, or cannot easily be used for both problem types, such as linear regression for regression predictive modeling and logistic regression for classification predictive modeling.<br>

Importantly, the way that we evaluate classification and regression predictions varies and does not overlap, for example:
* Classification predictions can be evaluated using accuracy, whereas regression predictions cannot.
* Regression predictions can be evaluated using root mean squared error, whereas classification predictions cannot.


#### **Some common types of Linear Regression**
* <b>Simple Linear Regression :</b> Involves a single independent variable predicting a dependent variable.
* <b>Multiple Linear regression :</b> Involves multiple independent variables predicting a dependent variable.

The main objective is to identify the best-fitting line, which is achieved by minimizing the differences between observed data points and their predicted values on this line. The characteristics of this line, defined by its slope and y-intercept, indicate the direction and starting point of the relationship, respectively.

<center>  
<img style="mix-blend-mode: darken;" src="images\graph.png" width="350px" alt="Representing the relationship between the variables">
<figcaption><strong>Fig. 1 Representing the relationship between the variables</strong></figcaption>
</center>
<br><br>
Mathematically, we can represent a linear regression as:

<center>y=b<sub>0</sub>+b<sub>1</sub>x</center>
where:<br>

* <b>y :</b> is the dependent variable or the variable we want to predict,
* <b>x :</b> is the independent variable or the variable used to predict y,
* <b>b<sub>0</sub> :</b> is the y-intercept, representing the value of y when x is zero,

<center>
<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size:22px;">
                              <msub>
                                <mi>b</mi>
                                <mn>0</mn>
                              </msub>
                              <mo>=</mo>
                              <mfrac>
                                <mrow>
                                  <mo stretchy="false">(</mo>
                                  <mo>&#8721;</mo>
                                  <mi>y</mi>
                                  <mo stretchy="false">)</mo>
                                  <mo stretchy="false">(</mo>
                                  <mo>&#8721;</mo>
                                  <msup>
                                    <mi>x</mi>
                                    <mn>2</mn>
                                  </msup>
                                  <mo stretchy="false">)</mo>
                                  <mo>&#8722;</mo>
                                  <mo stretchy="false">(</mo>
                                  <mo>&#8721;</mo>
                                  <mi>x</mi>
                                  <mo stretchy="false">)</mo>
                                  <mo stretchy="false">(</mo>
                                  <mo>&#8721;</mo>
                                  <mi>x</mi>
                                  <mi>y</mi>
                                  <mo stretchy="false">)</mo>
                                </mrow>
                                <mrow>
                                  <mi>n</mi>
                                  <mo stretchy="false">(</mo>
                                  <mo>&#8721;</mo>
                                  <msup>
                                    <mi>x</mi>
                                    <mn>2</mn>
                                  </msup>
                                  <mo stretchy="false">)</mo>
                                  <mo>&#8722;</mo>
                                  <msup>
                                    <mrow><mo stretchy="false">(</mo><mo>&#8721;</mo><mi>x</mi><mo stretchy="false">)</mo></mrow>
                                    <mn>2</mn>
                                  </msup>
                                </mrow>
                              </mfrac>
                            </math>

</center>
                          
* <b>b<sub>1</sub> : </b> is the slope or coefficient, indicating the change in y for a unit change in x,
<center>
                            <math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size:22px;">
                              <msub>
                                <mi>b</mi>
                                <mn>1</mn>
                              </msub>
                              <mo>=</mo>
                              <mfrac>
                                <mrow>
                                  <mi>n</mi>
                                  <mo stretchy="false">(</mo>
                                  <mo>&#8721;</mo>
                                  <mi>x</mi><mi>y</mi>
                                  <mo stretchy="false">)</mo>
                                  <mo>&#8722;</mo>
                                  <mo stretchy="false">(</mo>
                                  <mo>&#8721;</mo>
                                  <mi>x</mi>
                                  <mo stretchy="false">)</mo>
                                  <mo stretchy="false">(</mo>
                                  <mo>&#8721;</mo>
                                  <mi>y</mi>
                                  <mo stretchy="false">)</mo>
                                </mrow>
                                <mrow>
                                  <mi>n</mi>
                                  <mo stretchy="false">(</mo>
                                  <mo>&#8721;</mo>
                                  <msup>
                                    <mi>x</mi><mn>2</mn>
                                  </msup>
                                  <mo stretchy="false">)</mo>
                                  <mo>&#8722;</mo>
                                  <msup>
                                    <mrow>
                                      <mo stretchy="false">(</mo>
                                      <mo>&#8721;</mo>
                                      <mi>x</mi>
                                      <mo stretchy="false">)</mo>
                                    </mrow>
                                    <mn>2</mn>
                                  </msup>
                                </mrow>
                              </mfrac>
                            </math>

</center>

* <b>n : </b> is the total no. of observations.

#### **Example:**
Let's consider a dataset that shows the relationship between the number of Age (x) and the corresponding Fever level (y) of 6 students. We want to build a linear regression model to predict the Fever level based on the age.

<p><b>Step 1:</b> Calculate xy, x² and Σ :

<center>  
<img style="mix-blend-mode: darken;" src="images\Ex-3.1.jpg" alt="Training Dataset T">
</center><br>

<!-- <table align="center">
<thead>
<tr style="background-color:#7fc3e1;" >
    <th>SUBJECT</th>
    <th>x</th>
    <th>y</th>
    <th>xy</th>
    <th>x²</th>

</tr>
</thead>
<tbody>
<tr>
    <td>1</td>
    <td>43</td>
    <td>99</td>
    <td>4257</td>
    <td>1849</td>

</tr>
<tr>
    <td>2</td>
    <td>21</td>
    <td>65</td>
    <td>1365</td>
    <td>441</td>

</tr>
<tr>
    <td>3</td>
    <td>25</td>
    <td>79</td>
    <td>1975</td>
    <td>625</td>

</tr>
<tr>
    <td>4</td>
    <td>42</td>
    <td>75</td>
    <td>3150</td>
    <td>1764</td>

</tr>
<tr>
    <td>5</td>
    <td>57</td>
    <td>87</td>
    <td>4959</td>
    <td>3249</td>

</tr>
<tr>
    <td>6</td>
    <td>59</td>
    <td>81</td>
    <td>4779</td>
    <td>3481</td>

</tr>
<tr>
    <td><strong>Σ</strong></td>
    <td>247</td>
    <td>486</td>
    <td>20485</td>
    <td>11409</td>

</tr>
</tbody>
</table> -->

<p><b>Step 2:</b> Calculate b<sub>0</sub> and b<sub>1</sub>:
                      
Given data:
    
* n = 6 (number of observations)
* Σx = 247 (sum of x values)
* Σy = 486 (sum of y values)
* Σxy = 20485 (sum of x * y)
* Σx² = 11409 (sum of Σx²)
    
<b>Find b<sub>0</sub>:</b>

<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size:22px;">
<msub>
    <mi>b</mi>
    <mn>0</mn>
</msub>
<mo>=</mo>
<mfrac>
    <mrow>
    <mo stretchy="false">(</mo>
    <mo>&#8721;</mo>
    <mi>y</mi>
    <mo stretchy="false">)</mo>
    <mo stretchy="false">(</mo>
    <mo>&#8721;</mo>
    <msup>
        <mi>x</mi>
        <mn>2</mn>
    </msup>
    <mo stretchy="false">)</mo>
    <mo>&#8722;</mo>
    <mo stretchy="false">(</mo>
    <mo>&#8721;</mo>
    <mi>x</mi>
    <mo stretchy="false">)</mo>
    <mo stretchy="false">(</mo>
    <mo>&#8721;</mo>
    <mi>x</mi>
    <mi>y</mi>
    <mo stretchy="false">)</mo>
    </mrow>
    <mrow>
    <mi>n</mi>
    <mo stretchy="false">(</mo>
    <mo>&#8721;</mo>
    <msup>
        <mi>x</mi>
        <mn>2</mn>
    </msup>
    <mo stretchy="false">)</mo>
    <mo>&#8722;</mo>
    <msup>
        <mrow>
        <mo stretchy="false">(</mo>
        <mo>&#8721;</mo>
        <mi>x</mi>
        <mo stretchy="false">)</mo>
        </mrow>
        <mn>2</mn>
    </msup>
    </mrow>
</mfrac>
</math>
<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size:22px;">
<mo>=</mo>
<mfrac>
    <mrow>
    <mn>486</mn>
    <mo>&#x2217;</mo>
    <mn>11409</mn>
    <mo>&#x2212;</mo>
    <mn>247</mn>
    <mo>&#x2217;</mo>
    <mn>20485</mn>
    </mrow>
    <mrow>
    <mn>6</mn>
    <mo>&#x2217;</mo>
    <mn>11409</mn>
    <mo>&#x2212;</mo>
    <msup>
        <mrow>
        <mo stretchy="false">(</mo>
        <mn>247</mn>
        <mo stretchy="false">)</mo>
        </mrow>
        <mn>2</mn>
    </msup>
    </mrow>
</mfrac>\

</math>
<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 20px;">
<mrow>
    <mo>=</mo>
    <mn>65.14</mn>
    <mo>&#x2026;&#x2026;&#x2026;&#x2026;&#x2026;</mo>
    <mo>(</mo>
    <mn>1</mn>
    <mo>)</mo>
</mrow>
</math>
<br><br>
<b>Find b<sub>1</sub>:</b>
<br><br>

<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size:22px;">
<msub>
    <mi>b</mi>
    <mn>1</mn>
</msub>
<mo>=</mo>
<mfrac>
    <mrow>
    <mi>n</mi>
    <mo stretchy="false">(</mo>
    <mo>&#8721;</mo>
    <mi>x</mi>
    <mi>y</mi>
    <mo stretchy="false">)</mo>
    <mo>&#8722;</mo>
    <mo stretchy="false">(</mo>
    <mo>&#8721;</mo>
    <mi>x</mi>
    <mo stretchy="false">)</mo>
    <mo stretchy="false">(</mo>
    <mo>&#8721;</mo>
    <mi>y</mi>
    <mo stretchy="false">)</mo>
    </mrow>
    <mrow>
    <mi>n</mi>
    <mo stretchy="false">(</mo>
    <mo>&#8721;</mo>
    <msup>
        <mi>x</mi>
        <mn>2</mn>
    </msup>
    <mo stretchy="false">)</mo>
    <mo>&#8722;</mo>
    <msup>
        <mrow>
        <mo stretchy="false">(</mo>
        <mo>&#8721;</mo>
        <mi>x</mi>
        <mo stretchy="false">)</mo>
        </mrow>
        <mn>2</mn>
    </msup>
    </mrow>
</mfrac>
</math>

<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size:20px">
<mrow>
    <mo>=</mo>
    <mfrac>
    <mrow>
        <mn>6</mn>
        <mo>&#x2217;</mo>
        <mn>20485</mn>
        <mo>&#x2212;</mo>
        <mn>247</mn>
        <mo>&#x2217;</mo>
        <mn>486</mn>
    </mrow>
    <mrow>
        <mn>6</mn>
        <mo>&#x2217;</mo>
        <mn>11409</mn>
        <mo>&#x2212;</mo>
        <msup>
        <mrow>
            <mo stretchy="false">(</mo>
            <mn>247</mn>
            <mo stretchy="false">)</mo>
        </mrow>
        <mn>2</mn>
        </msup>
    </mrow>
    </mfrac>
</mrow>
</math>

<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 20px;">
<mrow>
    <mo>=</mo>
    <mn>0.38</mn>
    <mo>&#x2026;&#x2026;&#x2026;&#x2026;&#x2026;</mo>
    <mo>(</mo>
    <mn>2</mn>
    <mo>)</mo>
</mrow>
</math>
<br><br><br>
<p><b>Step 3: </b>Insert the values into the equation:
<p> using values from (1) and (2)
        <p>

<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size:20px">
<mi>y'</mi>
<mo>=</mo>
<msub>
    <mi>b</mi>
    <mn>0</mn>
</msub>
<mo>+</mo>
<msub>
    <mi>b</mi>
    <mn>1</mn>
</msub>
<mi>x</mi>
</math>
</br> </br>

<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 20px;">
<mrow>
    <mi>y'</mi>
    <mo>=</mo>
    <mn>65.14</mn>
    <mo>+</mo>
    <mo>(</mo>
    <mn>0.38</mn>
    <mo>&#x2217;</mo>
    <mn>x</mn>
    <mo>)</mo>
</mrow>
</math>
<br><br>

<p><b>Step 4: </b>Prediction - the value of y for the given value of x = 55:

<p>
<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 20px;">
<mrow>
    <mi>y'</mi>
    <mo>=</mo>
    <mn>65.14</mn>
    <mo>+</mo>
    <mo>(</mo>
    <mn>0.38</mn>
    <mo>&#x2217;</mo>
    <mn>55</mn>
    <mo>)</mo>
</mrow>
</math>
<br><br>

<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 20px;">
<mrow>
    <mi>y'</mi>
    <mo>=</mo>
    <mn>86.04</mn>
</mrow>
</math>
<br>

#### <p><b>Output :</b>
<p>The linear regression equation for the given data is:

<p> <math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 20px;">
    <mrow>
        <mi>y'</mi>
        <mo>=</mo>
        <mn>65.14</mn>
        <mo>+</mo>
        <mo>(</mo>
        <mn>0.38</mn>
        <mo>&#x2217;</mo>
        <mn>x</mn>
        <mo>)</mo>
    </mrow>
    </math>
<p>Prediction for x = 55:<br><br>
    <math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 20px;">
    <mrow>
        <mi>y'</mi>
        <mo>=</mo>
        <mn>86.04</mn>
    </mrow>
    </math>
<br><br>

#### **Applications of Linear Regression:**
* <b>Economics :</b> Predicting consumer demand, analyzing price elasticity, and estimating market trends.
* <b>Finance :</b> Modeling stock returns, predicting asset prices, and assessing risk factors.
* <b>Healthcare :</b> Analyzing the relationship between medical variables, predicting patient outcomes.
* <b>Social Sciences :</b> Investigating the impact of variables on social phenomena, analyzing survey data.
* <b>Marketing :</b> Determining the effectiveness of advertising campaigns, forecasting sales.


#### **Advantages of Linear Regression:**
* Simple and easy to understand.
* Provides insights into the relationship between variables.
* Can be used for both prediction and inference.
* Computationally efficient for large datasets.
* Provides measures of uncertainty and statistical significance.

#### **Disadvantages of Linear Regression:**
* Assumes a linear relationship between variables, which may not always hold.
* Sensitive to outliers and influential observations.
* Cannot capture complex nonlinear relationships between variables.
* Requires the absence of multicollinearity (high correlation) among independent variables.
* May be affected by heteroscedasticity (unequal variances of errors).