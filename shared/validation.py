# Notebook validation utilities for Digital Pathology Tutorial System

import traceback
from typing import Dict, List, Any, Callable
import sys
import io

class NotebookValidator:
    """Utility class for validating notebook exercises"""
    
    def __init__(self):
        self.tests_passed = 0
        self.tests_failed = 0
        self.test_results = []
    
    def assert_test(self, condition: bool, test_name: str, error_message: str = ""):
        """Run a single test assertion"""
        try:
            assert condition, error_message
            self.tests_passed += 1
            self.test_results.append({
                'test': test_name,
                'status': 'PASS',
                'message': '✅ Passed'
            })
            print(f"✅ {test_name}: PASSED")
        except AssertionError as e:
            self.tests_failed += 1
            self.test_results.append({
                'test': test_name,
                'status': 'FAIL',
                'message': f'❌ {error_message or str(e)}'
            })
            print(f"❌ {test_name}: FAILED - {error_message or str(e)}")
        except Exception as e:
            self.tests_failed += 1
            self.test_results.append({
                'test': test_name,
                'status': 'ERROR',
                'message': f'🔥 Error: {str(e)}'
            })
            print(f"🔥 {test_name}: ERROR - {str(e)}")
    
    def run_function_test(self, func: Callable, test_name: str, expected_output: Any = None):
        """Test function execution"""
        try:
            # Capture stdout
            old_stdout = sys.stdout
            sys.stdout = captured_output = io.StringIO()
            
            result = func()
            
            # Restore stdout
            sys.stdout = old_stdout
            output = captured_output.getvalue()
            
            if expected_output is not None:
                self.assert_test(result == expected_output, test_name, 
                               f"Expected {expected_output}, got {result}")
            else:
                self.assert_test(True, test_name, "Function executed successfully")
                
        except Exception as e:
            sys.stdout = old_stdout
            self.assert_test(False, test_name, f"Function failed: {str(e)}")
    
    def check_variable_exists(self, var_name: str, globals_dict: Dict):
        """Check if a variable exists in the notebook namespace"""
        exists = var_name in globals_dict
        self.assert_test(exists, f"Variable '{var_name}' exists", 
                        f"Variable '{var_name}' not found in notebook")
        return exists
    
    def check_variable_type(self, var_name: str, expected_type: type, globals_dict: Dict):
        """Check if a variable has the expected type"""
        if self.check_variable_exists(var_name, globals_dict):
            actual_type = type(globals_dict[var_name])
            self.assert_test(actual_type == expected_type, 
                           f"Variable '{var_name}' type check",
                           f"Expected {expected_type.__name__}, got {actual_type.__name__}")
    
    def summary(self):
        """Print test summary"""
        total_tests = self.tests_passed + self.tests_failed
        success_rate = (self.tests_passed / total_tests * 100) if total_tests > 0 else 0
        
        print("\n" + "="*60)
        print("📊 VALIDATION SUMMARY")
        print("="*60)
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {self.tests_passed}")
        print(f"❌ Failed: {self.tests_failed}")
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 90:
            print("🎉 EXCELLENT! You've mastered this tutorial!")
        elif success_rate >= 75:
            print("👍 GOOD JOB! Review the failed tests and try again.")
        elif success_rate >= 50:
            print("📚 KEEP LEARNING! Check the tutorial materials again.")
        else:
            print("📖 NEEDS WORK! Review the fundamentals and practice more.")
        
        print("="*60)
        
        return success_rate >= 75  # Return True if passed
